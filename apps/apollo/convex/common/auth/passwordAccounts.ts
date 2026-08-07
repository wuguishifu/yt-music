import { retrieveAccount } from '@convex-dev/auth/server';
import { GenericActionCtx, GenericDataModel } from 'convex/server';

export const PASSWORD_PROVIDER_ID = 'password';

export type RetrieveAccountFailure =
  'InvalidAccountId' | 'InvalidSecret' | 'TooManyFailedAttempts';

export const getRetrieveAccountFailure = (
  error: unknown,
): RetrieveAccountFailure | null => {
  if (!(error instanceof Error)) {
    return null;
  }

  switch (error.message) {
    case 'InvalidAccountId':
    case 'InvalidSecret':
    case 'TooManyFailedAttempts':
      return error.message;
    default:
      return null;
  }
};

export const retrievePasswordAccountByEmail = async <
  DataModel extends GenericDataModel,
>(
  ctx: GenericActionCtx<DataModel>,
  email: string,
) => {
  try {
    return await retrieveAccount(ctx, {
      provider: PASSWORD_PROVIDER_ID,
      account: { id: email },
    });
  } catch (error) {
    if (getRetrieveAccountFailure(error) === 'InvalidAccountId') {
      return null;
    }

    throw error;
  }
};
