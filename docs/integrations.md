# Website integration boundary

The website is independently deployable. `NEXT_PUBLIC_APP_URL` may point to the separately deployed SmartBau application; leave it empty until the correct URL is supplied. The website validates it as an absolute HTTP(S) URL without embedded credentials. Without a valid value, application links lead to the localized account page.

The account area is informational. It does not create a second identity, read account data, or claim that a visitor is signed in. SmartBau's reference application uses Auth.js sessions in its own API; any future integration must use an explicitly approved, versioned server-to-server or same-site authorization contract. Browser code must not receive reusable app tokens or pass them across domains. Every protected request must be authorized by the application server, and project/room access must follow the deployed authorization policy.

The contract marker is `integrationContractVersion: 1`. Newsletter, inquiries, plugin submissions, and assistant requests return `503 integration_unavailable` after bounded JSON validation. They do not send email, retain submissions, charge, or invoke an AI service. Invalid JSON, oversized bodies, invalid fields, and invalid email addresses receive a client error. Submitted values are not logged.

Before enabling a service, add a reviewed server implementation, origin/CSRF protections appropriate to its auth model, rate limits, retention rules, and an accurate localized UI state. Do not treat CORS or a client supplied project identifier as authorization.
