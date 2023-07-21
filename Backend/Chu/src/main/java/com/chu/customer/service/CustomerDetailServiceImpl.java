package com.chu.customer.service;

import com.chu.customer.domain.ResponseCustomerDetailDto;
import com.chu.customer.domain.ResponseCustomerDetailInfoDto;
import com.chu.customer.repository.CustomerDetailRepository;
import com.chu.customer.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomerDetailServiceImpl implements CustomerDetailService {

    private final CustomerDetailRepository customerDetailRepository;

    @Override
    public boolean patchImage(String imgName) {
        return customerDetailRepository.patchImage(imgName);
    }

    @Override
    public ResponseCustomerDetailDto getCustomerDetail(int customerSeq) {
        ResponseCustomerDetailDto responseCustomerDetailDto = new ResponseCustomerDetailDto();

        responseCustomerDetailDto.setCustomerDto(customerDetailRepository.getCustomerInfo(customerSeq));
        responseCustomerDetailDto.setCustomerHairConditionDtoList(customerDetailRepository.getCustomerHairCondition(customerSeq));

        responseCustomerDetailDto.setPastConsultingDtoList(customerDetailRepository.getPastConsultingList(customerSeq));
        responseCustomerDetailDto.setFutureConsultingDtoList(customerDetailRepository.getFutureConsultingList(customerSeq));

        return responseCustomerDetailDto;
    }

    @Override
    public ResponseCustomerDetailInfoDto getCustomerUpdateDetailInfo(int customerSeq) {
        ResponseCustomerDetailInfoDto responseCustomerDetailInfoDto = new ResponseCustomerDetailInfoDto();

        // 고객정보 가져와
        responseCustomerDetailInfoDto.setCustomerDto(customerDetailRepository.getCustomerInfo(customerSeq));
        responseCustomerDetailInfoDto.setFaceTypeList(customerDetailRepository.getALLFaceTypeList());
        responseCustomerDetailInfoDto.setHairStyleList(customerDetailRepository.getAllHairStyleList());

        responseCustomerDetailInfoDto.setHairConditionList(customerDetailRepository.getCustomerHairCondition(customerSeq));


        return responseCustomerDetailInfoDto;
    }
}
