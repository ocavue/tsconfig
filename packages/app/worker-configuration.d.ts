declare namespace Cloudflare {
  interface Env {
    EXAMPLE_VAR: 'Hello from environment variables';
  }
}
interface Env extends Cloudflare.Env {}
