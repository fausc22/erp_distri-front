import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


import toast, { Toaster } from 'react-hot-toast';
import Navbar from '../../components/Navbar/Navbar';
import useAuth from '../../components/useAuth';

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = 'VERTIMAR | INICIO';
  });
  useAuth(); // Bloquea si no hay token
  

  return (
    
    <div><h1>hola</h1><Toaster /></div>
      
    
  );
};

export default Home;
