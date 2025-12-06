/**
 * @typedef {Object} User
 * @property {string} id - Unique identifier for the user (UUID)
 * @property {string} name - Full name of the user
 * @property {string} username - Unique username of the user
 * @property {string} password - Password of the user
 * @property {string} email - Email address of the user
 * @property {string} avatar - Avatar image filename
 * @property {'available'|'unavailable'} status - Current availability status
 */

/** @type {User[]} */
export const users = [
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    username: 'volkmar',
    password: '123456',
    name: 'Volkmar Torben Neudoerffer',
    email: 'vneudoerffer@gmail.com',
    avatar: 'volkmar.jpg',
    status: 'unavailable',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    username: 'john.smith',
    password: '123456',
    name: 'John Smith',
    email: 'john.smith@example.com',
    avatar: 'default.jpg',
    status: 'unavailable',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    username: 'sarah.j',
    password: '123456',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    avatar: 'default.jpg',
    status: 'unavailable',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    username: 'michael.b',
    password: '123456',
    name: 'Michael Brown',
    email: 'michael.b@example.com',
    avatar: 'default.jpg',
    status: 'unavailable',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440004',
    username: 'emily.d',
    password: '123456',
    name: 'Emily Davis',
    email: 'emily.d@example.com',
    avatar: 'default.jpg',
    status: 'unavailable',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440005',
    username: 'david.w',
    password: '123456',
    name: 'David Wilson',
    email: 'david.w@example.com',
    avatar: 'david.w.png',
    status: 'unavailable',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440006',
    username: 'lisa.a',
    password: '123456',
    name: 'Lisa Anderson',
    email: 'lisa.a@example.com',
    avatar: 'default.jpg',
    status: 'unavailable',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440007',
    username: 'james.t',
    password: '123456',
    name: 'James Taylor',
    email: 'james.t@example.com',
    avatar: 'default.jpg',
    status: 'unavailable',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440008',
    username: 'jennifer.m',
    password: '123456',
    name: 'Jennifer Martinez',
    email: 'jennifer.m@example.com',
    avatar: 'default.jpg',
    status: 'unavailable',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440009',
    username: 'robert.g',
    password: '123456',
    name: 'Robert Garcia',
    email: 'robert.g@example.com',
    avatar: 'default.jpg',
    status: 'unavailable',
  },
];
