import { UploadProgressEvent } from "./upload";
import { RequestOptions } from "./upload-content";

export function httpRequest(options: RequestOptions) {
  const xhr = new XMLHttpRequest();

  const action = options.action;

  xhr.open(options.method, action, true);

  xhr.upload.addEventListener("progress", (e) => {
    const progressEvent = e as UploadProgressEvent;
    progressEvent.pecetange = e.total > 0 ? (e.loaded / e.total) * 100 : 0;

    options.onProgress(progressEvent); // 调用上传进度
  });
  // 请求头
  const headers = options.headers;
  if (headers) {
    for (const [key, value] of Object.entries(headers)) {
      xhr.setRequestHeader(key, value);
    }
  }

  // 请求体
  const formData = new FormData();
  if (options.data) {
    for (const [key, value] of Object.entries(options.data)) {
      formData.append(key, value);
    }
  }
  formData.append(options.name, options.file);

  //   console.log(formData)

  xhr.onload = function () {
    console.log(xhr);
    if (xhr.status < 300 && xhr.status >= 200) {
      options.onSuccess(xhr.response);
    } else {
      options.onError({ status: xhr.status });
    }
  };

  xhr.addEventListener("error", function (err) {
    console.log("error");
    options.onError(err);
  });

  xhr.send(formData);

  return xhr;
}
