import React, { useEffect, useState } from 'react';
import { getUser, updateUser } from '../api/api';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUser(1); // replace 1 with logged-in user's ID
      setUser(data);
    };
    fetchUser();
  }, []);

  const handleUpdate = async () => {
    const updated = await updateUser(1, { phone: '250783002701' });
    setUser(updated);
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <button onClick={handleUpdate}>Update Phone</button>
    </div>
  );
};

export default Profile;

