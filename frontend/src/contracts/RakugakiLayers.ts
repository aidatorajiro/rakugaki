/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "./common";

export type RakugakiLayerStruct = { image: string; timestamp: BigNumberish };

export type RakugakiLayerStructOutput = [image: string, timestamp: bigint] & {
  image: string;
  timestamp: bigint;
};

export interface RakugakiLayersInterface extends Interface {
  getFunction(nameOrSignature: "addImage" | "getLayer"): FunctionFragment;

  encodeFunctionData(
    functionFragment: "addImage",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "getLayer",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "addImage", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getLayer", data: BytesLike): Result;
}

export interface RakugakiLayers extends BaseContract {
  connect(runner?: ContractRunner | null): RakugakiLayers;
  waitForDeployment(): Promise<this>;

  interface: RakugakiLayersInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  addImage: TypedContractMethod<
    [id: BigNumberish, data: string],
    [void],
    "nonpayable"
  >;

  getLayer: TypedContractMethod<
    [id: BigNumberish],
    [RakugakiLayerStructOutput],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "addImage"
  ): TypedContractMethod<
    [id: BigNumberish, data: string],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "getLayer"
  ): TypedContractMethod<
    [id: BigNumberish],
    [RakugakiLayerStructOutput],
    "view"
  >;

  filters: {};
}