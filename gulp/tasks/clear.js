import { deleteAsync } from 'del';

export const clearDist = () => {
  return deleteAsync(['dist/']);
}

export const clearPlaceholders = () => {
  return deleteAsync(['src/**/.placeholder']); // '.git'
}