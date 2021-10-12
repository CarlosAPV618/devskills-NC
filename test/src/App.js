import React from 'react';
import Form from './components/Form';
import Menu from './components/Menu';
import Table from './components/Table';
import UsersProvider from './context/UsersProvider';
import Footer from './Footer';

const App = () => {

  return (
    <UsersProvider>
      <Menu />
      <div className="container">
          <Form />
          <Table />
      </div>
      <Footer />
    </UsersProvider>
  );
};

export default App;