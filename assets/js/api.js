const getTodos = async () => {
 const response = await fetch("http://localhost:3000/signin", {
   method: "post",
   headers: { "Content-type": "application/json" },
   body: JSON.stringify({
     email: this.state.signInEmail,
     password: this.state.signInPassword,
   }),
 });

 const todos = await response.json();

 return todos;
};

export default getTodos;