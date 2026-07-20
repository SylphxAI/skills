#!/usr/bin/env node

import http from 'node:http';

const server = http.createServer((request, response) => {
  const address = server.address();
  const base = `http://127.0.0.1:${address.port}`;
  if (request.method === 'GET' && request.url === '/.well-known/oauth-protected-resource') {
    response.writeHead(200, { 'content-type': 'application/json' });
    response.end(JSON.stringify({
      resource: `${base}/api/mcp`,
      authorization_servers: [base],
      scopes_supported: [
        'enact.observe',
        'enact.propose',
        'enact.claim',
        'enact.checkpoint',
        'enact.evidence',
      ],
      mcp: {
        transport: 'streamable_http',
        endpoint: `${base}/api/mcp`,
        protocol_revisions_supported: ['2024-11-05', '2025-03-26'],
      },
    }));
    return;
  }
  if (request.method === 'POST' && request.url === '/api/mcp') {
    let body = '';
    request.setEncoding('utf8');
    request.on('data', (chunk) => { body += chunk; });
    request.on('end', () => {
      let payload;
      try {
        payload = JSON.parse(body);
      } catch {
        response.writeHead(400, { 'content-type': 'application/json' });
        response.end(JSON.stringify({ error: 'invalid_json' }));
        return;
      }
      if (payload.method === 'initialize') {
        response.writeHead(200, {
          'content-type': 'application/json',
          'mcp-protocol-version': '2025-03-26',
        });
        response.end(JSON.stringify({
          jsonrpc: '2.0',
          id: payload.id,
          result: {
            protocolVersion: '2025-03-26',
            serverInfo: { name: 'enact-fixture', version: '1.0.0' },
            capabilities: { tools: {} },
            instructions: 'Fixture only: claims own work, not files.',
          },
        }));
        return;
      }
      response.writeHead(401, {
        'content-type': 'application/json',
        'www-authenticate': `Bearer resource_metadata="${base}/.well-known/oauth-protected-resource"`,
      });
      response.end(JSON.stringify({
        jsonrpc: '2.0',
        id: payload.id,
        error: { code: -32000, message: 'unauthorized' },
      }));
    });
    return;
  }
  response.writeHead(404);
  response.end();
});

server.listen(0, '127.0.0.1', () => {
  const address = server.address();
  console.log(`MCP_URL=http://127.0.0.1:${address.port}/api/mcp`);
});

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => server.close(() => process.exit(0)));
}
