import { ICheckLocationPermission } from 'domain/usecases/ICheckLocationPermission';
import { check, Permission } from 'react-native-permissions';

export class RNPermissionCheckLocationPermission
  implements ICheckLocationPermission
{
  constructor(private readonly permission: Permission) {}

  async execute(): Promise<boolean> {
    const permission = await check(this.permission);

    if (permission === 'granted') {
      return true;
    }

    return false;
  }
}
