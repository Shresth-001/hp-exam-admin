

export const fetchResume = async (url: string) => {
  if (!url) {
    throw new Error('URL is missing.');
  }

  console.log("reached")
//   const proxyApiUrl = `/api/resume-proxy?url=${encodeURIComponent(url)}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch file via proxy: ${response.statusText}`);
  }

  
  return response.blob();
};