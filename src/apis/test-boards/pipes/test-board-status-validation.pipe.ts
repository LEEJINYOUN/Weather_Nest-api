import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { TestBoardStatus } from '../entities/common/enums';

// 커스텀 파이프
export class TestBoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [TestBoardStatus.PRIVATE, TestBoardStatus.PUBLIC];

  transform(value: any, metadata: ArgumentMetadata) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value}은 상태로 사용할 수 없습니다.`);
    }

    return value;
  }

  // 상태 유효값이 없는 경우
  private isStatusValid(status: any) {
    const index = this.StatusOptions.indexOf(status);

    return index !== -1;
  }
}
