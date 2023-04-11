import { useState } from 'react';

function TokenForm() {
  const [token, setToken] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const gen = event.target.token.value;

    const response = await fetch(`http://localhost:5000/gettoken/${gen}`);

    const token = await response.text()

    console.log(token)

    sessionStorage.setItem("token", token);
    const get_token = sessionStorage.getItem("token")
    
    window.location.reload();
    if (response.ok) {
      const data = await response.json();
      setToken(data.token);
    } else {
      console.error('Failed to retrieve token');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Token:
        <input type="text" name="token" required />
      </label>
      <br />
      <br />
      <button type="submit">Get Token</button>
    </form>
  );
}

export default TokenForm;
