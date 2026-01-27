import { create } from "zustand";

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  isDefault: boolean;
}

interface AddressState {
  addresses: Address[];
  selectedAddressId: string | null;
  actions: {
    addAddress: (address: Omit<Address, "id">) => void;
    removeAddress: (id: string) => void;
    selectAddress: (id: string) => void;
    setDefaultAddress: (id: string) => void;
    resetSelection: () => void;
  };
}

const initialAddresses: Address[] = [];

export const useAddressStore = create<AddressState>((set) => ({
  addresses: initialAddresses,
  selectedAddressId: null,
  actions: {
    addAddress: (newAddress) =>
      set((state) => {
        const id = `addr-${Date.now()}`;
        const addressWithId = { ...newAddress, id };

        let updatedAddresses = [...state.addresses];
        if (newAddress.isDefault) {
          updatedAddresses = updatedAddresses.map((a) => ({
            ...a,
            isDefault: false,
          }));
        }
        updatedAddresses.push(addressWithId);

        return {
          addresses: updatedAddresses,
          selectedAddressId: newAddress.isDefault
            ? id
            : state.selectedAddressId,
        };
      }),
    removeAddress: (id) =>
      set((state) => {
        const updatedAddresses = state.addresses.filter((a) => a.id !== id);
        let nextSelectedId = state.selectedAddressId;

        // If we deleted the selected address, pick the default or the first one left
        if (state.selectedAddressId === id) {
          const defaultAddr = updatedAddresses.find((a) => a.isDefault);
          nextSelectedId = defaultAddr
            ? defaultAddr.id
            : updatedAddresses[0]?.id || null;
        }

        return {
          addresses: updatedAddresses,
          selectedAddressId: nextSelectedId,
        };
      }),
    selectAddress: (id) => set({ selectedAddressId: id }),
    setDefaultAddress: (id) =>
      set((state) => ({
        addresses: state.addresses.map((a) => ({
          ...a,
          isDefault: a.id === id,
        })),
      })),
    resetSelection: () => set({ selectedAddressId: null }),
  },
}));
