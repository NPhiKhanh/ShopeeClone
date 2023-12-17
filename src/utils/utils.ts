import config from '../constants/config'
import user from '../assets/images/user.png'

export const generateUrlName = ({ name, id }: { name: string; id: string }) => {
  return (
    name
      //eslint-disable-next-line no-useless-escape
      .replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')
      .replace(/\s/g, '-') + `-i_${id}`
  )
}
export const getIdFromUrl = (name: string) => {
  const arr = name.split('-i_')
  return arr[arr.length - 1]
}

export const getAvatarURL = (avatar?: string) => (avatar ? `${config.baseURL}/images/${avatar}` : user)
