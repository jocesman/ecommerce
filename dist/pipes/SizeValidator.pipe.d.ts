import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
export declare class SizeValidatorPipe implements PipeTransform<any, any> {
    transform(value: any, metadata: ArgumentMetadata): any;
}
