import { RNPermissionCheckLocationPermission } from './RNPermissionsCheckLocationPermission';
import RNPermission from 'react-native-permissions';
import { ICheckLocationPermission } from '../../../domain/usecases/ICheckLocationPermission';

type SutTypes = {
  sut: ICheckLocationPermission;
};

const makeSut = (): SutTypes => {
  const sut = new RNPermissionCheckLocationPermission(
    RNPermission.PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  );
  return { sut };
};

describe('RNPermissionsChechtLocationPermissionUseCase', () => {
  it('Should return true if RNPermissions.check returns granted', async () => {
    const { sut } = makeSut();
    const rnPermissionSpy = jest.spyOn(RNPermission, 'check');

    const permission = await sut.execute();

    expect(rnPermissionSpy).toBeCalled();
    expect(permission).toBe(true);
  });

  it("Should return false if RNPermissions.check doesn't return granted", async () => {
    const { sut } = makeSut();
    const rnPermissionSpy = jest
      .spyOn(RNPermission, 'check')
      .mockResolvedValueOnce('denied');

    const permission = await sut.execute();

    expect(rnPermissionSpy).toBeCalled();
    expect(permission).toBe(false);
  });
});
