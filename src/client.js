import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: '80qddw81',
  dataset: 'production',
  apiVersion: '2022-02-01',
  useCdn: true,
  token:
    'skiSfvmqTKq4Na1Kd8zsoXCuOMFDYQHSVgE3g0fsVhG7NFVjfE0JVU3KpPvn97VURiFYQgc247CDGcZ249hR3rSsvIStz0kVe6nK09O2lVhVQ7AFHn5qSBxRrfH3364S1szpMQFSKxE7L9SkOu4K3z2LZyPKehzPOw3JOTR3e45wstFiBhK6',
});

const builder = imageUrlBuilder(client);

export const urlFor = source => builder.image(source);
