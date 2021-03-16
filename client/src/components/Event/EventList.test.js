import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { events } from '../Event/EventMocks';
import EventList from './EventList';

afterEach(cleanup);
