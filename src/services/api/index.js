import {
  SIGNUP_PATIENT_URL,
  SIGNUP_DOCTOR_URL,
  CREATE_AP_URL,
  GET_AP_URL,
  CANCEL_AP_URL,
  CREATE_PATIENT_URL,
  GET_ALL_DOC,
  LOGIN_PATIENT_URL,
  LOGIN_DOCTOR_URL,
  CREATE_DOCTOR_URL,
  LOGOUT_PATIENT_URL,
  LOGOUT_DOCTOR_URL,
  GET_DOCTOR,
  GET_PATIENT,
  UPDATE_PATIENT_URL,
  UPDATE_DOCTOR_URL,
  UPDATE_AP_URL,
  SPARK_API_URL,
} from "../../utils/url";

export const SignupPatient = async (data) => {
  return new Promise(async (resolve, reject) => {
    await fetch(`${SIGNUP_PATIENT_URL}`, {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) resolve(result.response);
        else reject(result.err);
      })
      .catch((err) => reject(err));
  });
};

export const SignupDoctor = async (data) => {
  return new Promise(async (resolve, reject) => {
    await fetch(`${SIGNUP_DOCTOR_URL}`, {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) resolve(result.response);
        else reject(result.err);
      })
      .catch((err) => reject(err));
  });
};

export const loginPatient = async (data) => {
  return new Promise(async (resolve, reject) => {
    await fetch(`${LOGIN_PATIENT_URL}`, {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) resolve(result.response.data);
        else reject(result.err);
      })
      .catch((err) => reject(err));
  });
};

export const loginDoctor = async (data) => {
  return new Promise(async (resolve, reject) => {
    await fetch(`${LOGIN_DOCTOR_URL}`, {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) resolve(result.response.data);
        else reject(result.err);
      });
  });
};

export const createPatient = async (data) => {
  const bodyObj = {
    id: data.id,
    name: data.name,
    age: data.age,
    city: data.city,
    address: data.address,
    state: data.state,
    pincode: data.pincode,
    dob: data.dob,
    phoneNo: data.phone,
    gender: data.gender,
    bloodGp: data.bloodGp,
    email: data.email,
  };
  return new Promise(async (resolve, reject) => {
    await fetch(`${CREATE_PATIENT_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyObj),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) resolve(result.response);
        else reject(result.err);
      })
      .catch((err) => reject(err));
  });
};

export const updatePatient = async (data) => {

  return new Promise(async (resolve, reject) => {
    await fetch(`${UPDATE_PATIENT_URL}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) resolve(result.response);
        else reject(result.err);
      })
      .catch((err) => {
        reject(err.message);
      });
  });
};

export const updateDoctor = async (data) => {

  return new Promise(async (resolve, reject) => {
    await fetch(`${UPDATE_DOCTOR_URL}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) resolve(result.response);
        else reject(result.err);
      })
      .catch((err) => {
        reject(err.message);
      });
  });
};

export const createDoctor = async (data) => {
  return new Promise(async (resolve, reject) => {
    await fetch(`${CREATE_DOCTOR_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) resolve(result.response);
        else reject(result.err);
      })
      .catch((err) => reject(err));
  });
};

export const logoutPatient = async (data) => {
  return new Promise(async (resolve, reject) => {
    await fetch(
      `${LOGOUT_PATIENT_URL}?` +
        new URLSearchParams({
          phoneNo: data.phoneno,
        }),
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.success) resolve(result.response);
        else reject(result.err);
      });
  });
};

export const logoutDoctor = async (data) => {
  return new Promise(async (resolve, reject) => {
    await fetch(
      `${LOGOUT_DOCTOR_URL}?` +
        new URLSearchParams({
          phoneNo: data.phoneno,
        }),
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.success) resolve(result.response);
        else reject(result.err);
      });
  });
};

export const getAllDoctors = async () => {
  return new Promise(async (resolve, reject) => {
    await fetch(`${GET_ALL_DOC}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if(result.success)
        resolve(result.response);
        else
        reject(result.err)
      })
      .catch((err) => reject(err));
  });
};

export const getDoctor = async (phoneno) => {
  return new Promise(async (resolve, reject) => {
    await fetch(
      `${GET_DOCTOR}?` +
        new URLSearchParams({
          phoneno: phoneno,
        }),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.success) resolve(result.response);
        else reject(result.err);
      })
      .catch((err) => reject(err.message));
  });
};

export const getPatient = async (phoneno) => {
  return new Promise(async (resolve, reject) => {
    await fetch(
      `${GET_PATIENT}?` +
        new URLSearchParams({
          phoneno: phoneno,
        }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.success) resolve(result.response);
        else reject(result.err);
      })
      .catch((err) => reject(err.message));
  });
};

export const createAppointment = async (data) => {
  return new Promise(async (resolve, reject) => {
    await fetch(`${CREATE_AP_URL}`, {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if(result.success)
        resolve(result);
        else
        reject(result.err)
      })
      .catch((err) => reject(err));
  });
};

export const getAppointment = async (data) => {
  return new Promise(async (resolve, reject) => {
    if (data.forUser === "doctor") {
      const url = data.status?GET_AP_URL +
      `all?forUser=doctor&status=${data.status}&dphoneNo=${data.dphoneNo}`:
      GET_AP_URL +
          `all?forUser=doctor&dphoneNo=${data.dphoneNo}`
      await fetch(
        url,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((result) => {
          if(result.success)
          resolve(result);
          else
          reject(result.response)
        })
        .catch((err) => reject(err));
    } else if(data.forUser === 'patient'){
      const url = data.status?GET_AP_URL +
      `all?forUser=patient&status=${data.status}&pphoneNo=${data.pphoneNo}`:
      GET_AP_URL +
          `all?forUser=patient&pphoneNo=${data.pphoneNo}`
      await fetch(
        url,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((result) => {
      
          if(result.success)
          resolve(result);
          else
          reject(result.response)
        })
        .catch((err) => reject(err));
    }
    else return;
  });
};


export const getTodayAppointment = async (data) => {
  return new Promise(async (resolve,reject) => {

    const url = GET_AP_URL +
    `all?forUser=doctor&dphoneNo=${data.dphoneNo}&status=${data.status}`
    await fetch(
      url,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        if(result.success)
        resolve(result);
        else
        reject(result)
      })
      .catch((err) => reject(err));

  })
}
export const cancelAppointment = async (data) => {
  return new Promise(async (resolve, reject) => {
    await fetch(`${CANCEL_AP_URL}`, {
      method: "DELETE",
      body: data,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if(result.success)
        resolve(result);
        else
        reject(result.err)
      })
      .catch((err) => reject(err));
  });
};

export const updateAppointment = async (data) => {
  return new Promise(async (resolve,reject) => {
    await fetch(`${UPDATE_AP_URL}`,{
      method:'PUT',
      body:data,
      headers:{
        'Content-Type':'application/json'
      }
    })
    .then(response => response.json())
    .then((result) => {
      if(result.success)
      resolve(result.response)
      else
      reject(result.err)
    })
    .catch(err => reject(err.message))
  })
}
export const testRoute = async () => {
  return new Promise(async (resolve,reject) => {
    await fetch(`${SPARK_API_URL}`,{
      method:'get',
      headers:{
        'Content-Type':'application/json'
      }
    })
    .then(result => resolve(result))
    .catch(err => reject(err))
  })
}