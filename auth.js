// ------------------- Supabase setup -------------------
const supabaseUrl = 'https://fjgpxuwgouzqccghscjo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqZ3B4dXdnb3V6cWNjZ2hzY2pvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2MzE0MDUsImV4cCI6MjA3OTIwNzQwNX0.rZil28ozKRRmp3SEOTa2vHNKUH4AhPqEOr9lVrg7avo';

// Use capital S for CDN
const supabase = Supabase.createClient(supabaseUrl, supabaseKey);

// ------------------- REGISTER -------------------
async function registerUser() {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Sign up in Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password
  });

  if (authError) {
    alert(authError.message);
    return;
  }

  // Insert into profiles table
  const { data, error } = await supabase
    .from('profiles')
    .insert([{
      id: authData.user.id,
      username: username,
      email: email,
      roadbux: 0,
      role: 'player'
    }]);

  if (error) {
    alert(error.message);
    return;
  }

  alert("Account created successfully!");
  window.location.href = "login.html";
}

// ------------------- LOGIN -------------------
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert(error.message);
    return;
  }

  alert("Logged in!");
  window.location.href = "dashboard.html";
}
