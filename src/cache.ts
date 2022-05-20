import fs from 'fs';
import path from 'path';

const dirPath = path.join(__dirname, './../node_modules/.progress');
const filePath = path.join(dirPath, 'index.json');

export interface ICacheProgress {
    /**
     * transforming 的 modules
     */
    total: number;

    /**
     * 文件总数量
     */
    file: number;

    /**
     * 已经转换的文件数
     */
    transformed: number;

    /**
     * 更新的百分比
     */
    percent: number;

    /**
     * 记录上一次的更新百分比
     */
    lastPercent: number;
}

export const isExists = fs.existsSync(dirPath);

export const getCacheCode = (): ICacheProgress | null => {
    if (!isExists) return null;

    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

export const setCacheCode = (code: ICacheProgress) => {
    !isExists && fs.mkdirSync(dirPath);
    fs.writeFileSync(filePath, JSON.stringify(code));
};