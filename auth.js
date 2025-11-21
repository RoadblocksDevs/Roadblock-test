// ------------------- Supabase setup -------------------
const supabaseUrl = 'https://fjgpxuwgouzqccghscjo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqZ3B4dXdnb3V6cWNjZ2hzY2pvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2MzE0MDUsImV4cCI6MjA3OTIwNzQwNX0.rZil28ozKRRmp3SEOTa2vHNKUH4AhPqEOr9lVrg7avo'; // replace with your anon key
const client = supabase.createClient(supabaseUrl, supabaseKey);

// ------------------- REGISTER FUNCTION -------------------
async function registerUser() {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!username || !email || !password) {
    alert("Please fill all fields!");
    return;
  }

  try {
    // Sign up user
    const { data, error } = await client.auth.signUp({ email, password });
    if (error) {
      if (error.message.includes("already registered")) {
        alert("This email is already registered. Try logging in!");
      } else {
        alert(error.message);
      }
      return;
    }

    // If email verification is required but not confirmed
    if (data.user && !data.user.confirmed_at) {
      alert("Account created! Please verify your email before logging in.");
      return;
    }

    // Insert into profiles table
    const { error: profileError } = await client
      .from('profiles')
      .insert([{
        id: data.user.id,
        username,
        email,
        roadbux: 0,
        role: 'player'
      }]);

    if (profileError) {
      alert(profileError.message);
      return;
    }

    alert("Account created successfully!");
    window.location.href = "login.html";

  } catch (err) {
    console.error(err);
    alert("Something went wrong during registration!");
  }
}

// ------------------- LOGIN FUNCTION -------------------
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Please fill all fields!");
    return;
  }

  try {
    const { data, error } = await client.auth.signInWithPassword({ email, password });
    if (error) {
      alert(error.message);
      return;
    }

    const user = data.user;

    if (!user.confirmed_at) {
      alert("Your email is not verified. Please check your inbox.");
      return;
    }

    alert("Logged in successfully!");
    window.location.href = "dashboard.html";

  } catch (err) {
    console.error(err);
    alert("Something went wrong during login!");
  }
}

// ------------------- ATTACH FUNCTIONS TO BUTTONS -------------------
document.addEventListener("DOMContentLoaded", () => {
  const registerBtn = document.getElementById("registerBtn");
  const loginBtn = document.getElementById("loginBtn");

  if (registerBtn) registerBtn.addEventListener("click", registerUser);
  if (loginBtn) loginBtn.addEventListener("click", login);
});
