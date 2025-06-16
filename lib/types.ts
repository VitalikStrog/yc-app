import { Author, Startup } from '@/sanity/types'

export type ActionStateType = { error: string; status: 'INITIAL' | 'ERROR' | 'SUCCESS' }
export type FormFields = 'title' | 'description' | 'category' | 'link'
export type ErrorsStateType = { [key in FormFields | 'pitch']?: string }
export type FormStateType = { [key in FormFields]?: string }

export type StartupCardType = Omit<Startup, 'author'> & { author?: Author }
