"use server"
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache';

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
    const cookieStore = await cookies()
    // console.log("form Submitted")
  const res = await fetch("https://quickchat.fly.dev/api/accounts/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  const token = data.token 
    cookieStore.set('token', token)
  if (!res.ok) {
    // console.error("Login failed:", data);
    return { error: data.detail || "Login failed" };
  }  
  redirect('/chat') 
}

 

export const handleGoogleAuth = async (code: string) => {
  const clientId = process.env.GOOGLE_CLIENT_ID!;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET!;
  const redirectUri = 'http://localhost:3000'; // Must match Google Console
  const cookieStore = await cookies();

  try {
    // Exchange the authorization code for tokens
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    const data = await response.json();

    // Check for errors in the Google response
    if (!response.ok || data.error || !data.id_token) {
      console.error('Error getting tokens from Google:', data);
      throw new Error(data.error_description || 'Failed to get tokens from Google');
    }

    const { id_token } = data;

    // Send the ID token to Django backend for registration
    const regResponse = await fetch('https://quickchat.fly.dev/api/accounts/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken: id_token }),
    });

    const regData = await regResponse.json();

    if (!regResponse.ok || !regData.token) {
      console.error('Error during registration:', regData);
      throw new Error('Registration failed');
    }

    // Store the token in cookie (client can't use `cookies()` directly)
    cookieStore.set('token', regData.token);

    console.log('User authenticated and token stored:', regData.token);

    return { idToken: regData.token };
  } catch (err) {
    console.error('Final error in handleGoogleAuth:', err);
    throw err;
  }
};



export async function signupAction(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const first_name = formData.get('first_name') as string;
  const last_name = formData.get('last_name') as string;
   
    // console.log("form Submitted")
  const res = await fetch("https://quickchat.fly.dev/api/accounts/signup/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password, first_name , last_name }),
  });
 
 
   
  if (!res.ok) {
    // console.error("Login failed:", data);
    return { error: "Signup failed" };
  }  
  redirect('/login') 
}


export async function getLoggedInUser() {
    const cookieStore = await cookies()
  const token = cookieStore.get('token')
    // console.log()
  if (!token) return null;

  // ✅ Call your Django DRF `/api/accounts/me/` or similar
  const res = await fetch("https://quickchat.fly.dev/api/accounts/users/", {
    headers: {
      Authorization: `Token ${token.value}`,
    },
    cache: 'no-store', // always fresh
  });

  if (!res.ok) return null;

  const user = await res.json();
  console.log(user)
  // const user = JSON.parse(us.value);
  return user;
}



export async function editProfileAction(formData: FormData) {
  const first_name = formData.get('first_name') as string;
  const last_name = formData.get('last_name') as string;
  const date_of_birth = formData.get('date_of_birth') as string;
  const gender = formData.get('gender') as string;
  console.log(first_name)
  console.log(last_name)
  console.log(date_of_birth)
  console.log(gender)
       const cookieStore = await cookies()
      const token = cookieStore.get('token')
    // console.log("form Submitted")
  const res = await fetch("https://quickchat.fly.dev/api/accounts/users/", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token.value}`,
    },
    body: JSON.stringify({ first_name, last_name,date_of_birth , gender}),
  });

  const data = await res.json();
  // const token = data.token 
    // cookieStore.set('token', token)
  if (!res.ok) {
    // console.error("Login failed:", data);
    return { error: data.detail || "Login failed" };
  }  
  redirect('/dashboard/profile') 
}



export async function getAddress() {
    const cookieStore = await cookies()
  const token = cookieStore.get('token')
    // console.log()
  if (!token) return null;

  // ✅ Call your Django DRF `/api/accounts/me/` or similar
  const res = await fetch("https://quickchat.fly.dev/api/accounts/ship/shipping-addresses/", {
    headers: {
      Authorization: `Token ${token.value}`,
    },
     
  });

  if (!res.ok) return null;

  const data = await res.json();
  
  return data;
}



export async function addAddress(formData: FormData) {
  const full_name = formData.get('full_name') as string
  const address_type = formData.get('address_type') as string
  const street_address = formData.get('street_address') as string
  const city = formData.get('city') as string
  const state = formData.get('state') as string
  const area = formData.get('area') as string
  const postcode = formData.get('postcode') as string
  const phone_number = formData.get('phone_number') as string

  const is_default_shipping = formData.get('is_default_shipping') === 'on'
  const is_default_billing = formData.get('is_default_billing') === 'on'

  const cookieStore = cookies()
  const token = cookieStore.get('token')

  if (!token) {
    console.error('Token missing')
    return null
  }

  const body = {
    full_name,
    address_type,
    street_address,
    city,
    state,
    area,
    postcode,
    phone_number,
    is_default_shipping,
    is_default_billing,
  }

  const res = await fetch('https://quickchat.fly.dev/api/accounts/ship/shipping-addresses/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token.value}`,
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    console.error('Failed to add address:', res.status)
    return null
  }

  const data = await res.json()
  return data
}




export async function getSingleAddress({id}) {
    const cookieStore = await cookies()
  const token = cookieStore.get('token')
   console.log(id, "Single")
  if (!token) return null;

  // ✅ Call your Django DRF `/api/accounts/me/` or similar
  const res = await fetch(`https://quickchat.fly.dev/api/accounts/ship/shipping-addresses/${id}/`, {
    headers: {
      Authorization: `Token ${token.value}`,
    },
     
  });

  if (!res.ok) return null;

  const data = await res.json();
  
  return data;
}


export async function updateAddress(formData: FormData) {
  const id = formData.get("id")
  const full_name = formData.get('full_name') as string
  const address_type = formData.get('address_type') as string
  const street_address = formData.get('street_address') as string
  const city = formData.get('city') as string
  const state = formData.get('state') as string
  const area = formData.get('area') as string
  const postcode = formData.get('postcode') as string
  const phone_number = formData.get('phone_number') as string

  const is_default_shipping = formData.get('is_default_shipping') === 'on'
  const is_default_billing = formData.get('is_default_billing') === 'on'

  const cookieStore = cookies()
  const token = cookieStore.get('token')

  if (!token) {
    console.error('Token missing')
    return null
  }

  const body = {
    full_name,
    address_type,
    street_address,
    city,
    state,
    area,
    postcode,
    phone_number,
    is_default_shipping,
    is_default_billing,
  }

  const res = await fetch(`https://quickchat.fly.dev/api/accounts/ship/shipping-addresses/${id}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token.value}`,
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    console.error('Failed to add address:', res.status)
    return null
  }

  redirect('/dashboard/addressbook') 
}

 

export async function deleteAddress(id: number) {
  const cookieStore = cookies()
  const token = cookieStore.get('token')

  if (!token) return null

  const res = await fetch(`https://quickchat.fly.dev/api/accounts/ship/shipping-addresses/${id}/`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token ${token.value}`,
    },
  })

  if (!res.ok) {
    console.error('Delete failed:', res.status)
    return null
  }
  revalidatePath('/dashboard/addressbook')
  return { success: true }
}



export async function getLogout() {
    const cookieStore = await cookies()
  const token = cookieStore.get('token')
    // console.log()
  if (!token) return null;

  // ✅ Call your Django DRF `/api/accounts/me/` or similar
  const res = await fetch("https://quickchat.fly.dev/api/accounts/logout/", {
    headers: {
      Authorization: `Token ${token.value}`,
    },
     
  });

  if (!res.ok) return null;

  const data = await res.json();
  cookieStore.set('token', "")
  return data;
}



export async function markReadAction(formData: FormData) {
  const notifyId = formData.get('notifyId') as string;
 
    const cookieStore = await cookies()
      const token = cookieStore.get('token')
    // console.log("form Submitted")
  const res = await fetch(`https://quickchat.fly.dev/api/mark-as-read/${notifyId}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token.value}`,
    },
    // body: JSON.stringify({ }),
  });

  const data = await res.json();
  
  if (!res.ok) {
    // console.error("Login failed:", data);
    return { error: data.detail || "Login failed" };
  }  
  revalidatePath("/dashboard")
 
}

export async function bulkReadAction(formData: FormData) {
  
 
    const cookieStore = await cookies()
      const token = cookieStore.get('token')
    // console.log("form Submitted")
  const res = await fetch(`https://quickchat.fly.dev/api/mark-all-as-read/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token.value}`,
    },
    // body: JSON.stringify({ }),
  });

  const data = await res.json();
  
  if (!res.ok) {
    // console.error("Login failed:", data);
    return { error: data.detail || "Login failed" };
  }  
  revalidatePath("/dashboard")
 
}

export async function myChtatList() {
    const cookieStore = await cookies()
  const token = cookieStore.get('token')
    // console.log()
  if (!token) return null;

  // ✅ Call your Django DRF `/api/accounts/me/` or similar
  const res = await fetch("https://quickchat.fly.dev/api/my-chats/", {
    headers: {
      Authorization: `Token ${token.value}`,
    },
    cache: 'no-store', // always fresh
  });

  if (!res.ok) return null;

  const chat = await res.json();
  return chat;
}

 
export async function addUserAction(prevState: any, formData: FormData) {
  const receiver_email = formData.get('email') as string;

  if (!receiver_email) {
    return { error: "Email is required", message: "" };
  }

  const cookieStore =await cookies();
  const token = cookieStore.get('token');

  if (!token?.value) {
    return { error: "Unauthorized. No token found.", message: "" };
  }

  try {
    const res = await fetch("https://quickchat.fly.dev/api/chats/private-by-email/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token.value}`,
      },
      body: JSON.stringify({ receiver_email }),
    });

    if (!res.ok) {
      const data = await res.json();
      return {
        error: data?.error || "User addition failed",
        message: "",
      };
    }
    revalidatePath('/chat')
    const result = await res.json();
    return {
      error: "",
      message: "User added successfully",
    };
  } catch (err) {
    return {
      error: "Something went wrong on the server.",
      message: "",
    };
  }
}

 

export async function addGroupAction(prevState: any, formData: FormData) {
  const name = formData.get('name') as string
  const emailsRaw = formData.getAll('emails') as string[]  // collects all inputs with name="emails"

  if (!name || emailsRaw.length === 0) {
    return { error: "Group name and at least one email are required.", message: "" }
  }

  const cookieStore = await cookies()
  const token = cookieStore.get('token')

  if (!token?.value) {
    return { error: "Unauthorized. No token found.", message: "" }
  }

  try {
    const res = await fetch("https://quickchat.fly.dev/api/chats/group/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token.value}`,
      },
      body: JSON.stringify({ name, emails: emailsRaw }),
    })

    const data = await res.json()

    if (!res.ok) {
      return {
        error: data?.error || "Group creation failed",
        message: "",
      }
    }

    // revalidatePath('/chat')
    return {
      error: "",
      message: "Group created successfully!",
    }
  } catch (err) {
    return {
      error: "Something went wrong on the server.",
      message: "",
    }
  }
}
