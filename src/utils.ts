/**
 * パスからファイル名のみを返す関数
 * @param filePath
 * @returns
 */
export const getFilenameFromPath = (filePath: string): string => {
    if ((window as any).myAPI.NODE_ENV === 'development') {
        return filePath.split('/').pop() || filePath
    } else {
        return filePath.split('\\').pop() || filePath
    }
}
