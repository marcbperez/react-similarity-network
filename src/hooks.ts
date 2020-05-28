import { useState } from 'react';
import Venue from './Venue/Venue';

/**
 * Client ID state hook.
 */
type ClienIdHook = (clientId: string) => [string, (clientId: string) => void];
export const ClientId: ClienIdHook = (clientId) => {
  return useState<string>(clientId);
};

/**
 * Client secret state hook.
 */
type ClienSecretHook = (secret: string) => [string, (secret: string) => void];
export const ClientSecret: ClienSecretHook = (secret) => {
  return useState<string>(secret);
};

/**
 * Item collection state hook.
 */
type ItemsHook = (items: Venue[]) => [Venue[], (items: Venue[]) => void];
export const Items: ItemsHook = (items) => {
  return useState<Venue[]>(items);
};

/**
 * Error message state hook.
 */
type ErrorHook = (error: boolean) => [boolean, (error: boolean) => void];
export const Error: ErrorHook = (error) => {
  return useState<boolean>(error);
};
