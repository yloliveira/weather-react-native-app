import { IRequestLocationPermission } from 'domain/usecases/IRequestLocationPermission';
import { request, Permission } from 'react-native-permissions';

export class RNPermissionsRequestLocationPermission
  implements IRequestLocationPermission
{
  constructor(private readonly permission: Permission) {}

  async execute(): Promise<boolean> {
    const permission = await request(this.permission);

    if (permission === 'granted') {
      return true;
    }

    return false;
  }
}
