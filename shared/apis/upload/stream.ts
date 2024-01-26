import axios from 'axios';

export const API_StreamTMP = async (fileName: string) => {
  const result = await axios({
    method: "GET",
    url: `/file/tmp/${fileName}`,
    responseType: 'blob'
  })

  const imageUrl = URL.createObjectURL(new Blob([result.data]));
  return imageUrl
}
