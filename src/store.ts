export interface ImageProps {
  _id?: string
  url?: string
  createdAt?: string
  fitUrl?: string
}
export interface PostProps {
  _id?: string
  title: string
  excerpt?: string
  content?: string
  image?: ImageProps | string
  createdAt?: string
  column: string
  author?: string | UserProps
  isHTML?: boolean
}
const store = {}

export default store
