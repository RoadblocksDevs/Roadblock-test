// Supabase setup (same as auth.js)
const supabaseUrl = 'https://fjgpxuwgouzqccghscjo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqZ3B4dXdnb3V6cWNjZ2hzY2pvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2MzE0MDUsImV4cCI6MjA3OTIwNzQwNX0.rZil28ozKRRmp3SEOTa2vHNKUH4AhPqEOr9lVrg7avo';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Check if user is logged in
async function checkUser() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    window.location.href = "login.html"; // not logged in → redirect
    return;
  }

  loadProfile(user.id);
}

// Load user profile data
async function loadProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    alert(error.message);
    return;
  }

  document.getElementById('username').textContent = data.username;
  document.getElementById('role').textContent = data.role;
  document.getElementById('roadbux').textContent = data.roadbux;
}

// Logout function
async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    alert(error.message);
    return;
  }
  window.location.href = "login.html"; // redirect after logout
}

// Run checkUser on page load
checkUser();
