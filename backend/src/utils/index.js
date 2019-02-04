import { wsSend } from 'src/server'
import { setError } from 'shared/wsActions'


export const handleError = msg => wsSend(setError(msg.toString()))
