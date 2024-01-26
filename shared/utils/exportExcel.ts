import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

export interface IExportToExcel {
    datas: any;
    fileName: string;
}
export const exportToExcelHandler = ({ datas, fileName }: IExportToExcel) => {
    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const worksheet = XLSX.utils.json_to_sheet(datas);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    return FileSaver.saveAs(data, fileName + fileExtension);
};