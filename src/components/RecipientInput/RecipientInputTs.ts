/**
 * Copyright 2020 NEM Foundation (https://nem.io)
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {Component, Vue, Prop} from 'vue-property-decorator'
import {mapGetters} from 'vuex'
import {Address, NamespaceId, NetworkType} from 'nem2-sdk'

// internal dependencies
import {ValidationRuleset} from '@/core/validators/ValidationRuleset'

// child components
// @ts-ignore
import ErrorTooltip from '@/components/ErrorTooltip/ErrorTooltip.vue'

@Component({
  components: {
    ErrorTooltip,
  },
  computed: {...mapGetters({
    networkType: 'network/networkType',
  })}
})
export class RecipientInputTs extends Vue {

  @Prop({
    default: null
  }) value: Address | string

  /**
   * Current network type
   * @var {NetworkType}
   */
  public networkType: NetworkType

  /**
   * Validation rules
   * @var {ValidationRuleset}
   */
  public validationRules = ValidationRuleset

/// region computed properties getter/setter
  public get rawValue(): string {
    if (this.value instanceof Address) {
      return this.value.plain()
    }

    return this.value
  }

  public set rawValue(input: string) {
    if ([40, 46].includes(input.length)) {
      this.$emit('input', Address.createFromRawAddress(input))
    }
    else {
      this.$emit('input', input)
    }
  }
/// end-region computed properties getter/setter
}
