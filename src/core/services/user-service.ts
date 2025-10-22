import { type PaymentRange, PaymentRangeSchema } from "../domains/payment";
import type {
  CreateUserParams,
  LoginParams,
  UpdateUserParams,
  User,
} from "../domains/user";
import type { AuctionRepository } from "../ports/auction-repository";
import type { UserRepository } from "../ports/user-repository";
import { filterPaymentsByRange } from "../utils/filter-payments-by-range";
import {
  type GroupPaymentsByDayReturn,
  groupPaymentsByDay,
} from "../utils/group-payments-by-day";

export type PaymentsParams = {
  filterBy?: {
    range: PaymentRange;
  };
};

export class UserService {
  constructor(
    readonly userRepo: UserRepository,
    readonly auctionRepo: AuctionRepository,
  ) {}

  async me(): Promise<User | null> {
    return await this.userRepo.me();
  }

  async create(params: CreateUserParams): Promise<User> {
    return await this.userRepo.create(params);
  }

  async login(params: LoginParams): Promise<User> {
    return await this.userRepo.login(params);
  }

  async logout(): Promise<void> {
    return await this.userRepo.logout();
  }

  async count(): Promise<number> {
    return await this.userRepo.count();
  }

  async update(params: UpdateUserParams): Promise<User> {
    const me = await this.me();

    if (!me) {
      throw new Error("Only authenticated user allowed");
    }

    return await this.userRepo.update({ ...params, id: me.id });
  }

  async paymentsReceived(
    params: PaymentsParams = {},
  ): Promise<GroupPaymentsByDayReturn> {
    const me = await this.me();
    if (!me) throw new Error("Only authenticated user allowed");

    const payments = await this.auctionRepo.userPaymentsReceived({
      userId: me.id,
    });

    const range =
      params?.filterBy?.range ?? PaymentRangeSchema.enum.SINCE_SIGNUP;
    const filtered = filterPaymentsByRange(payments, range, me.createdAt);

    return groupPaymentsByDay(filtered);
  }

  async paymentsMade(
    params: PaymentsParams = {},
  ): Promise<GroupPaymentsByDayReturn> {
    const me = await this.me();
    if (!me) throw new Error("Only authenticated user allowed");

    const payments = await this.auctionRepo.userPaymentsMade({
      userId: me.id,
    });

    const range =
      params.filterBy?.range ?? PaymentRangeSchema.enum.SINCE_SIGNUP;
    const filtered = filterPaymentsByRange(payments, range, me.createdAt);

    return groupPaymentsByDay(filtered);
  }
}
