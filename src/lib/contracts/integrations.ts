/** Versioned boundary for future, server-authorized integrations. */
export const integrationContractVersion = 1 as const;

export type IntegrationStatus = 'unavailable' | 'configured';

export interface IntegrationUnavailable {
  contractVersion: typeof integrationContractVersion;
  status: 'unavailable';
  code: 'integration_unavailable';
  message: string;
}

/** Never send app credentials or reusable access tokens through this website. */
export interface IntegrationAuthorizationRequest {
  contractVersion: typeof integrationContractVersion;
  action: string;
}

export function unavailableIntegration(message: string): IntegrationUnavailable {
  return {
    contractVersion: integrationContractVersion,
    status: 'unavailable',
    code: 'integration_unavailable',
    message,
  };
}
