import { useState } from 'react';
import { Header, Form, Button, Span, Input } from './SearchBar.styled';
import PropTypes from 'prop-types';

export const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleInput = e => {
    setQuery(e.currentTarget.value.toLowerCase().trim());
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(query);
    setQuery('');
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <Button type="submit">
          <Span>Search</Span>
        </Button>

        <Input
          onChange={handleInput}
          type="text"
          autoComplete="off"
          value={query}
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </Header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
