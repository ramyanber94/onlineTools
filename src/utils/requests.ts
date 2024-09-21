export const getRequests = async (url: string) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/${url}`, {
      mode: "cors",
    });
    return await response.json();
  } catch (error: any) {
    return error;
  }
};

export const postRequests = async (url: string, data: any) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/${url}`, {
      method: "POST",
      body: JSON.stringify(data),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error: any) {
    return error;
  }
};

export const putRequests = async (url: string, data: any) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/${url}`, {
      method: "PUT",
      body: JSON.stringify(data),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error: any) {
    return error;
  }
};

export const deleteRequests = async (url: string) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/${url}`, {
      method: "DELETE",
      mode: "cors",
    });
    return await response.json();
  } catch (error: any) {
    return error;
  }
};
