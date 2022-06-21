import { SetMetadata } from '@nestjs/common';

export const ALLOW_UNAUTH_KEY = 'allowUnauthorizedRequest';

export const AllowUnauthorizedRequest = () => SetMetadata(ALLOW_UNAUTH_KEY, true);
