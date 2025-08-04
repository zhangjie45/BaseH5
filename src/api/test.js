import request from "@/utils/request";
const DICTS_URL = '/api/large/screen/notice?projectId=100';
const props = {
  withCredentials: true,
}
let http = request.init(props)

//根据字典类型查询字典数据信息
export const reqDictData = (data) =>
  http.get(DICTS_URL)
