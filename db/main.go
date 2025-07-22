package main

import (
    "fmt"
   	"log"
   	"net/http"
   	"os"
   	"os/exec"
   	"path/filepath"
   	"slices"

    "github.com/pocketbase/pocketbase"
    "github.com/pocketbase/pocketbase/apis"
    "github.com/pocketbase/pocketbase/core"
    "github.com/pocketbase/pocketbase/tools/filesystem"
)

func main() {
	app := pocketbase.New()

    app.OnServe().BindFunc(func(se *core.ServeEvent) error {
		se.Router.POST("/api/upload/video", func(c *core.RequestEvent) error {
			authRecord := c.Auth
			if authRecord == nil {
				return apis.NewUnauthorizedError("Вы не авторизованы", nil)
			}

			_, header, err := c.Request.FormFile("video")
            if err != nil {
            	return err
            }
            //defer file.Close()

			h := header.Header.Get("Content-Type")
			if !slices.Contains([]string{"video/mp4", "video/mp4"}, h) {
				return apis.NewApiError(http.StatusBadRequest, "bad_request", err)
			}

			file, errFs := filesystem.NewFileFromMultipart(header)
			if errFs != nil {
				return apis.NewApiError(http.StatusInternalServerError, "Не удалось создать файл из multipart", errFs)
			}

			videosCollection, err := app.FindCollectionByNameOrId("videos")
			if err != nil {
				return apis.NewApiError(http.StatusInternalServerError, "Коллекция 'videos' не найдена", err)
			}

			record := core.NewRecord(videosCollection)
			record.Set("original_video", file)

			if err := app.Save(record); err != nil {
				return apis.NewApiError(http.StatusInternalServerError, "Не удалось создать запись в БД", err)
			}

			record, err = app.FindRecordById("videos", record.Id)
			if err != nil {
				return apis.NewApiError(http.StatusInternalServerError, "Ошибка при поиске записи", err)
			}
			app.Save(record)

			go func() {
				tempDir := os.TempDir()
				watermarkedFilename := filepath.Join(tempDir, fmt.Sprintf("watermarked_%s", record.GetString("original_video")))
				defer os.Remove(watermarkedFilename)

				originalFilename := "./pb_data/storage/" + record.BaseFilesPath() + "/" + record.GetString("original_video")
				watermarkPath := "./pb_assets/watermark.png"
				cmd := exec.Command(
					"ffmpeg",
					"-i", originalFilename,
					"-i", watermarkPath,
					"-filter_complex", "overlay",
					"-c:a", "copy",
					watermarkedFilename,
				)

				// Для отладки: выводим команду и ошибки
				cmd.Stdout = os.Stdout
				cmd.Stderr = os.Stderr

				err = cmd.Run()
				if err != nil {
					// return apis.NewApiError(http.StatusInternalServerError, "Ошибка FFmpeg для видео", err)
					return
				}

				watermarkedFileFS, err := filesystem.NewFileFromPath(watermarkedFilename)
				if err != nil {
					// return apis.NewApiError(http.StatusInternalServerError, "Ошибка при подготовке файла вотермарки для PB", err)
					return
				}

				record.Set("watermarked_video", watermarkedFileFS)
				if err := app.Save(record); err != nil {
					// return apis.NewApiError(http.StatusInternalServerError, "Ошибка при сохранении вотермаркированного видео в PB", err)
					return
				}
			}()

			return c.JSON(http.StatusOK, map[string]string{
				"id": record.Id,
			})
		})


		se.Router.POST("/api/upload/image", func(c *core.RequestEvent) error {
			authRecord := c.Auth
			if authRecord == nil {
				return apis.NewUnauthorizedError("Вы не авторизованы", nil)
			}

			_, header, err := c.Request.FormFile("image")
            if err != nil {
            	return err
            }
            //defer file.Close()

// 			h := header.Header.Get("Content-Type")
// 			if !slices.Contains([]string{"video/mp4", "video/mp4"}, h) {
// 				return apis.NewApiError(http.StatusBadRequest, "bad_request", err)
// 			}

			file, errFs := filesystem.NewFileFromMultipart(header)
			if errFs != nil {
				return apis.NewApiError(http.StatusInternalServerError, "Не удалось создать файл из multipart", errFs)
			}

			videosCollection, err := app.FindCollectionByNameOrId("images")
			if err != nil {
				return apis.NewApiError(http.StatusInternalServerError, "Коллекция 'images' не найдена", err)
			}

			record := core.NewRecord(videosCollection)
			record.Set("original_image", file)

			if err := app.Save(record); err != nil {
				return apis.NewApiError(http.StatusInternalServerError, "Не удалось создать запись в БД", err)
			}

			record, err = app.FindRecordById("images", record.Id)
			if err != nil {
				return apis.NewApiError(http.StatusInternalServerError, "Ошибка при поиске записи", err)
			}
			app.Save(record)

			go func() {
				tempDir := os.TempDir()
				watermarkedFilename := filepath.Join(tempDir, fmt.Sprintf("watermarked_%s", record.GetString("original_image")))
				defer os.Remove(watermarkedFilename)

				originalFilename := "./pb_data/storage/" + record.BaseFilesPath() + "/" + record.GetString("original_image")
				watermarkPath := "./pb_assets/watermark.png"
				cmd := exec.Command(
					"ffmpeg",
					"-i", originalFilename,
					"-i", watermarkPath,
					"-filter_complex", "overlay",
					"-c:a", "copy",
					watermarkedFilename,
				)

				// Для отладки: выводим команду и ошибки
				cmd.Stdout = os.Stdout
				cmd.Stderr = os.Stderr

				err = cmd.Run()
				if err != nil {
					// return apis.NewApiError(http.StatusInternalServerError, "Ошибка FFmpeg для видео", err)
					return
				}

				watermarkedFileFS, err := filesystem.NewFileFromPath(watermarkedFilename)
				if err != nil {
					// return apis.NewApiError(http.StatusInternalServerError, "Ошибка при подготовке файла вотермарки для PB", err)
					return
				}

				record.Set("watermarked_image", watermarkedFileFS)
				if err := app.Save(record); err != nil {
					// return apis.NewApiError(http.StatusInternalServerError, "Ошибка при сохранении вотермаркированного видео в PB", err)
					return
				}
			}()

			return c.JSON(http.StatusOK, map[string]string{
				"id": record.Id,
			})
		})


        return se.Next()
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
