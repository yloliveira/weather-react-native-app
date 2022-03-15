import { RNPermissionCheckLocationPermission } from './RNPermissionsCheckLocationPermission';
import RNPermission from 'react-native-permissions';

const makeSut = () => {
  const sut = new RNPermissionCheckLocationPermission(
    RNPermission.PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  );
  return { sut };
};

describe('RemoteListMarketplaceItems', () => {
  it('Should return true if RNPermissions.check returns granted', async () => {
    const { sut } = makeSut();
    const rnPermissionSpy = jest.spyOn(RNPermission, 'check');
    const permission = await sut.execute();
    expect(rnPermissionSpy).toBeCalled();
    expect(permission).toBe(true);
  });
});
