export default function fetchApiService() {
  async function fetchData(request:Request):Promise<Response> {
    const response = await fetch(request);
    const data = await response.json();
    return data;
  }

  return {
    fetchData,
  };
}
