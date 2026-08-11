import { ConvexReactClient } from 'convex/react';

import { environment } from '../../env';

export const convexClient = new ConvexReactClient(environment.CONVEX_URL, {
  unsavedChangesWarning: false,
});
