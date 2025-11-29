export function isValidUUID(uuid: string) {
  const uuidRegex =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;
  return uuidRegex.test(uuid);
}

export const isBoolean = (val: any) => typeof val === 'boolean';

export const isValidArtistId = (id: string | null) =>
  isValidUUID(id) || id === null ? true : false;
