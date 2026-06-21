import { FastifyInstance } from 'fastify';
import { circuitBreakerState, circuitBreakerQueueDepth } from '../metrics/prometheus.js';

export function registerCircuitHealth(app: FastifyInstance): void {
  app.get('/circuit-health', async () => {
    const stateMetric = circuitBreakerState.get().values.find((v) => v.labels.client === 'soroban');
    const queueMetric = circuitBreakerQueueDepth.get().values.find((v) => v.labels.client === 'soroban');
    return {
      state: stateMetric ? stateMetric.value : 0,
      queueDepth: queueMetric ? queueMetric.value : 0,
    };
  });
}
