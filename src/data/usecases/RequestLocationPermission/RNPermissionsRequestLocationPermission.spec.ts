import { RNPermissionsRequestLocationPermission } from './RNPermissionsRequestLocationPermission';
import RNPermission from 'react-native-permissions';
import { IRequestLocationPermission } from '../../../domain/usecases/IRequestLocationPermission';

type SutTypes = {
  sut: IRequestLocationPermission;
};

const makeSut = (): SutTypes => {
  const sut = new RNPermissionsRequestLocationPermission(
    RNPermission.PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  );
  return { sut };
};

describe('RNPermissionsRequestLocationPermissionUseCase', () => {
  it('Should return true if RNPermissions.request returns granted', async () => {
    const { sut } = makeSut();
    const rnPermissionSpy = jest.spyOn(RNPermission, 'request');

    const permission = await sut.execute();

    expect(rnPermissionSpy).toBeCalled();
    expect(permission).toBe(true);
  });

  it("Should return false if RNPermissions.request doesn't return granted", async () => {
    const { sut } = makeSut();
    const rnPermissionSpy = jest
      .spyOn(RNPermission, 'request')
      .mockResolvedValueOnce('denied');

    const permission = await sut.execute();

    expect(rnPermissionSpy).toBeCalled();
    expect(permission).toBe(false);
  });
});
