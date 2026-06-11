import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BackButton } from '@sqs/rosetta-elements';
import { Combobox } from '@sqs/rosetta-compositions';
import { Text, Field } from '@sqs/rosetta-primitives';
import { useTranslateWithL10nLoader } from '@sqs/i18n-react';

const COUNTRIES = [
  { label: 'United States', value: 'US' },
  { label: 'Canada', value: 'CA' },
  { label: 'United Kingdom', value: 'GB' },
  { label: 'Australia', value: 'AU' },
];

const useGenerateCountries = () => COUNTRIES;

const Default = () => {
    const navigate = useNavigate();
    const options = useGenerateCountries();
    const [value, setValue] = useState<string | undefined>('');
    const [inputValue, setInputValue] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(options);
    const { t } = useTranslateWithL10nLoader();
    
    const handleInputValueChange = (_inputValue: string) => {
      setInputValue(_inputValue);
      const _filteredOptions = options.filter((option) =>
        option.label?.toLowerCase().startsWith(_inputValue.toLowerCase())
      );
      setFilteredOptions(_filteredOptions);
    };
    const handleValueChange = (newValue: string) => {
      setValue(newValue);
      setFilteredOptions(options);
    };
    const NoResults = () => (
      <Text.Body alignSelf="center" color="fg.muted" justifySelf="center" p={2}>
        {t('No results', null, {
          project: 'rosetta-react'
        })}
      </Text.Body>
    );
    return (
      <div id="componenttest-main">
      <BackButton
        label="Experiments"
        onClick={() => navigate('/experiments')}
        py={4}
        px={6}
      />
      <Field.Root>
        <Field.Label>
          {t('Country', null, {
            project: 'rosetta-react'
          })}
        </Field.Label>
        <Combobox.Root
          inputValue={inputValue}
          onInputValueChange={handleInputValueChange}
          onValueChange={handleValueChange}
          options={options}
          value={value}
        >
          <Combobox.Search my={1}>
            <Combobox.Search.Control
              placeholder={t('Select', null, {
                project: 'rosetta-react'
              })}
            />
            <Combobox.Search.Icon />
          </Combobox.Search>
          <Combobox.Portal>
            <Combobox.Positioner>
              <Combobox.List>
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => (
                    <Combobox.Option key={option.value} option={option}>
                      <Combobox.Option.Label>
                        {option.label}
                      </Combobox.Option.Label>
                      <Combobox.Option.Icon />
                    </Combobox.Option>
                  ))
                ) : (
                  <NoResults />
                )}
              </Combobox.List>
            </Combobox.Positioner>
          </Combobox.Portal>
        </Combobox.Root>
      </Field.Root>
      </div>
    );
  };

export default Default;
