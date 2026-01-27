import type { Route } from './+types/home';
import { env } from 'cloudflare:workers';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'React Router App' },
    { name: 'description', content: 'Welcome to React Router on Cloudflare!' },
  ];
}

export async function loader({ context }: Route.LoaderArgs) {
  return {
    envVar: env.EXAMPLE_VAR,
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div
      style={{
        fontFamily: 'system-ui, sans-serif',
        lineHeight: '1.8',
        padding: '2rem',
        maxWidth: '800px',
        margin: '0 auto',
      }}
    >
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
        Welcome to React Router v7
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#666' }}>
        This application is configured for Cloudflare deployment.
      </p>

      <div style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Features</h2>
        <ul style={{ fontSize: '1.1rem' }}>
          <li>React Router v7</li>
          <li>Server-Side Rendering (SSR)</li>
          <li>Cloudflare Workers deployment</li>
          <li>TypeScript support</li>
          <li>Environment variables: {loaderData.envVar}</li>
        </ul>
      </div>

      <div
        style={{
          marginTop: '2rem',
          padding: '1rem',
          background: '#f0f0f0',
          borderRadius: '8px',
        }}
      >
        <h3 style={{ marginTop: 0 }}>Getting Started</h3>
        <p>
          Edit <code>app/routes/home.tsx</code> to customize this page.
        </p>
      </div>
    </div>
  );
}
