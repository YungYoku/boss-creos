import { IUser } from '@/interfaces/User.ts'
import { IChat } from '@/interfaces/Chat.ts'
import { IRating } from '@/interfaces/Rating.ts'

export type IProjectStatus = 'created' | 'in_progress' | 'on_review' | 'ended'

export interface IProjectProposal {
	id: string
	collectionId: string
	collectionName: string
	created: string
	updated: string
	user: string
	chat: string
	text: string
	price: number
	expand?: {
		user?: IUser
		chat?: IChat
	}
}

export const emptyProposal: IProjectProposal = {
	id: '',
	collectionId: '',
	collectionName: '',
	created: '',
	updated: '',
	user: '',
	chat: '',
	text: '',
	price: 0
}

export interface IProject {
    id: string
    collectionId: string
    collectionName: string
    created: string
    updated: string
    title: string
    title_lowercase: string
    description: string
    description_lowercase: string
    price: number
    creator: string
    status: IProjectStatus
    ratingCreator: string
    ratingExecutor: string
    deadline: Date
    executor: string
    proposals: Array<string>
    chat: string
    file: string | null
	tutoring: false
    expand?: {
        creator?: IUser
        executor?: IUser
        chat?: IChat
        proposals?: Array<IProjectProposal>
        file?: {
            value: File
        },
        ratingCreator?: IRating
        ratingExecutor?: IRating
    }
}

export const emptyProject: IProject = {
	ratingCreator: '',
	ratingExecutor: '',
	chat: '',
	collectionId: '',
	collectionName: '',
	created: '',
	creator: '',
	deadline: new Date(),
	executor: '',
	id: '',
	proposals: [],
	status: 'created',
	updated: '',
	title: '',
	title_lowercase: '',
	description: '',
	description_lowercase: '',
	file: null,
	price: 100,
	tutoring: false,
	expand: {
		proposals: []
	}
}

export interface IProjects {
    items: Array<IProject>
    page: number
    perPage: number
    totalItems: number
    totalPages: number
}